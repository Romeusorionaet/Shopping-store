import { TechnicalProductDetailsProps } from '@/core/@types/api-store'

interface Props {
  technicalProductDetails: TechnicalProductDetailsProps
}

export function TechnicalProductDetails({ technicalProductDetails }: Props) {
  return (
    <div className="mb-28 ml-2">
      <h2 className="text-lg uppercase md:text-2xl">
        Detalhes técnicos do produto
      </h2>

      <div className="mt-8 flex flex-col gap-4 text-xs md:text-base">
        <div className="flex items-center gap-4">
          <span>Marca</span>
          <p className="bg-zinc-100 p-1">{technicalProductDetails.brand}</p>
        </div>
        <div className="flex items-center gap-4">
          <span>Modelo</span>
          <p className="bg-zinc-100 p-1">{technicalProductDetails.model}</p>
        </div>
        <div className="flex items-center gap-4">
          <span>Tempo médio da bateria</span>
          <p className="bg-zinc-100 p-1">
            {technicalProductDetails.averageBatteryLife}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span>Capacidade da bateria</span>
          <p className="bg-zinc-100 p-1">
            {technicalProductDetails.batteryCapacity}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span>Largura</span>
          <p className="bg-zinc-100 p-1">{technicalProductDetails.width}</p>
        </div>
        <div className="flex items-center gap-4">
          <span>Altura</span>
          <p className="bg-zinc-100 p-1">{technicalProductDetails.height}</p>
        </div>
        <div className="flex items-center gap-4">
          <span>Peso</span>
          <p className="bg-zinc-100 p-1">{technicalProductDetails.weight}</p>
        </div>
        <div className="flex items-center gap-4">
          <span>RAM</span>
          <p className="bg-zinc-100 p-1">{technicalProductDetails.ram}</p>
        </div>
        <div className="flex items-center gap-4">
          <span>ROM</span>
          <p className="bg-zinc-100 p-1">{technicalProductDetails.rom}</p>
        </div>
        <div className="flex items-center gap-4">
          <span>Resolução de vídeo</span>
          <p className="bg-zinc-100 p-1">
            {technicalProductDetails.videoResolution}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span>Resolução de captura de vídeo</span>
          <p className="bg-zinc-100 p-1">
            {technicalProductDetails.videoCaptureResolution}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span>Tela</span>
          <p className="bg-zinc-100 p-1">
            {technicalProductDetails.screenOrWatchFace}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span>Processador</span>
          <p className="bg-zinc-100 p-1">
            {technicalProductDetails.processorBrand}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span>Sistema operacional</span>
          <p className="bg-zinc-100 p-1">
            {technicalProductDetails.operatingSystem}
          </p>
        </div>
      </div>
    </div>
  )
}
