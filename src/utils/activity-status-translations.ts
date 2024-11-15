import { ActivityStatus } from '@/core/@types/api-store'

export const ActivityStatusTranslations: Record<ActivityStatus, string> = {
  [ActivityStatus.CREATED]: 'Criado',
  [ActivityStatus.UPDATED]: 'Atualizado',
  [ActivityStatus.DELETED]: 'Deletado',
}
