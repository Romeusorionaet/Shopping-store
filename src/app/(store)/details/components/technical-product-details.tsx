import { TechnicalProductDetailsProps } from '@/core/@types/api-store'

interface Props {
  technicalProductDetails: TechnicalProductDetailsProps
}

export function TechnicalProductDetails({ technicalProductDetails }: Props) {
  const productDetails = [
    { label: 'Marca', value: technicalProductDetails.brand },
    { label: 'Modelo', value: technicalProductDetails.model },
    { label: 'RAM', value: technicalProductDetails.ram },
    { label: 'ROM', value: technicalProductDetails.rom },
    { label: 'Processador', value: technicalProductDetails.processorBrand },
    { label: 'Tela', value: technicalProductDetails.screenOrWatchFace },
    { label: 'Largura', value: technicalProductDetails.width },
    { label: 'Altura', value: technicalProductDetails.height },
    { label: 'Peso', value: technicalProductDetails.weight },
    {
      label: 'Resolução de captura de vídeo',
      value: technicalProductDetails.videoCaptureResolution,
    },
    {
      label: 'Resolução de vídeo',
      value: technicalProductDetails.videoResolution,
    },
    {
      label: 'Tempo médio da bateria',
      value: technicalProductDetails.averageBatteryLife,
    },
    {
      label: 'Capacidade da bateria',
      value: technicalProductDetails.batteryCapacity,
    },
    {
      label: 'Sistema operacional',
      value: technicalProductDetails.operatingSystem,
    },
  ]

  return (
    <div className="mb-28 ml-2">
      <h2 className="text-lg uppercase md:text-2xl">
        Detalhes técnicos do produto
      </h2>

      <div className="mt-8 flex flex-col gap-4 text-xs md:text-base">
        {productDetails.map(
          (detail, index) =>
            detail.value && (
              <div key={index} className="flex items-center gap-4">
                <span>{detail.label}</span>
                <p className="bg-zinc-100 p-1">{detail.value}</p>
              </div>
            ),
        )}
      </div>
    </div>
  )
}
