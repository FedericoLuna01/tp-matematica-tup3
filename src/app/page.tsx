'use client'

import { useEffect, useRef, useState } from "react";
import { VennDiagramChart, extractSets } from "chartjs-chart-venn";
import { ChartConfiguration, Tooltip } from "chart.js";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast";
import { CircleOff, CirclePlus, Download, Trash, Undo2 } from "lucide-react";
import { SetIntersection } from "@/components/set-intersection";
import { externalTooltipHandler } from "./createTooltip";

const FormSchema = z.object({
  sets: z.array(
    z.object({
      name: z.string().min(1, { message: "El nombre del conjunto es requerido" }),
      values: z.string().min(1, { message: "Los valores del conjunto son requeridos" }),
      color: z.string().optional(),
    })
  )
})

export default function Home() {
  const canvasRef = useRef(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState<ChartConfiguration<'venn'>['data'] | null>(null);
  const [backgroundColors, setBackgroundColors] = useState<string[]>([])
  const [borderColors, setBorderColors] = useState<(string | undefined)[]>([])
  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      sets: [{
        name: '',
        values: '',
        color: '#ADADAD'
      }],
    },
  })

  const {
    fields: setsFields,
    append: appendset,
    remove: removeset,
  } = useFieldArray({
    name: "sets",
    control: form.control,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedData = data.sets.map(set => ({
      label: set.name,
      values: set.values.split(',').map(value => value.trim())
    }));

    const formattedColors = data.sets.map(set => set.color);
    const backgroundColors = formattedColors.map(color => `${color}20`);
    const borderColors = formattedColors.map(color => color);
    setBackgroundColors(backgroundColors);
    setBorderColors(borderColors);

    const extractedData = extractSets(formattedData);
    setChartData(extractedData);
    console.log({
      extractedData,
    })
    // Scroll to the canvas
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    // Show success toast
    toast({
      title: "Éxito!",
      description: "Los datos se han generado correctamente",
      variant: "success",
    })
  }

  useEffect(() => {
    if (!canvasRef.current || !chartData) return;

    const config: ChartConfiguration<'venn'> = {
      type: "venn",
      data: chartData,
      plugins: [Tooltip],
      options: {
        aspectRatio: 1,
        responsive: true,
        borderWidth: 1,
        //@ts-ignore
        backgroundColor: backgroundColors,
        //@ts-ignore
        borderColor: borderColors,
        plugins: {
          tooltip: {
            enabled: false,
            external: externalTooltipHandler,
          }
        }
      }
    };

    const chartInstance = new VennDiagramChart(canvasRef.current, config);

    return () => {
      chartInstance.destroy();
    };
  }, [chartData, backgroundColors, borderColors]);

  const handleDownload = async () => {
    if (!chartData) {
      toast({
        title: "Error!",
        description: "No hay datos para descargar",
        variant: "destructive",
      })
      return
    }
    if (divRef.current) {
      const canvas = await html2canvas(divRef.current);
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, 'div-image.png');
        }
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col lg:flex-row container pt-20">
      <div className="w-full lg:w-1/2">
        <h1 className="text-4xl font-bold">Tus conjuntos</h1>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full lg:w-2/3 my-4">
      <div className="space-y-6">
        {
          setsFields.map((set, index) => (
            <div key={set.id} className="space-y-2">
              <div
                className="flex gap-2"
              >
                <FormField
                  control={form.control}
                  name={`sets.${index}.name`}
                  render={({ field }) => (
                    <FormItem
                      className="w-full"
                    >
                      <FormLabel>Nombre del conjunto</FormLabel>
                      <FormControl>
                        <Input className='w-full' placeholder="A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`sets.${index}.color`}
                  render={({ field }) => (
                    <FormItem
                    >
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input type='color' className="w-[45px]" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name={`sets.${index}.values`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valores</FormLabel>
                    <FormControl>
                      <Input placeholder="1,2,3,4" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ingresa los valores separados con comas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant='destructive' type='button' onClick={() => {
                if (setsFields.length === 1) {
                  toast({
                    title: "Error!",
                    description: "No se pueden eliminar todos los conjuntos",
                    variant: "destructive",
                  })
                  return
                }
                removeset(index)
              }}>
                <Trash className="mr-2 w-5 h-5" />
                Eliminar conjunto
              </Button>
            </div>
          ))
        }
        <Button
        variant='secondary'
        className="my-4"
        type='button'
        onClick={() => {
          if (setsFields.length >= 5) {
            toast({
              title: "Error!",
              description: "No se pueden agregar más de 5 conjuntos",
              variant: "destructive",
            })
            return
          }
          appendset({ name: '', values: '', color: '#ADADAD' })
        }}>
          <CirclePlus className="mr-2 w-5 h-5"/>
          Agregar conjunto
        </Button>
        </div>
          <Button type="submit" className="w-full mb-10 mt-5">Generar</Button>
        </form>
      </Form>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col">
      <div className="flex items-center justify-between">
      <h1 className="text-4xl font-bold">Diagrama de Venn</h1>
      <div
          className="flex space-x-2"
      >
        <Button
          size='icon'
          variant='outline'
          onClick={handleDownload}
        >
          <Download />
        </Button>
        <Button
          size='icon'
          variant='outline'
          onClick={() => setChartData(null)}
        >
          <Undo2 />
        </Button>
      </div>
      </div>
        <div ref={divRef} className="mt-6 border border-border rounded-md p-6 h-[50vh] flex items-center justify-center">
          {
            chartData ? (
              <canvas width={400} height={250} ref={canvasRef} id="canvas"></canvas>
              )
              : (
                <div className="flex items-center justify-center flex-col max-w-[200px] opacity-40">
                  <CircleOff className=" w-16 h-16" />
                  <p className="text-xl text-center ">
                    Aún no hay datos para mostrar
                  </p>
                </div>
              )
          }
        </div>
        <div className="my-6">
          {
            chartData && (
              <div>
                <h2
                  className="text-2xl font-bold"
                >
                  Datos
                </h2>
                {
                  chartData.datasets[0].data.map((
                    data: { label: string; value: number, values: string[] },
                    index: number
                  ) => {
                    const values = data.values.join(', ')
                    return (
                      <div key={index}>
                        <p>{data.label}: {" "} { values }</p>
                      </div>
                    )
                  })
                }
              </div>
            )
          }
        {/* <SetIntersection data={formattedData} /> */}
        </div>
      </div>
    </main>
  );
}
