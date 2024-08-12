import type { AchievementDTO } from '@/@core/dtos'
import { Entity } from '../abstracts'
import { AchievementMetric, Image, Integer, Name, OrdinalNumber } from '../structs'

type AchievementProps = {
  name: Name
  icon: Image
  description: string
  reward: Integer
  metric: AchievementMetric
  requiredCount: Integer
  position: OrdinalNumber
}

export class Achievement extends Entity<AchievementProps> {
  static create(dto: AchievementDTO) {
    return new Achievement({
      name: Name.create(dto.name),
      metric: AchievementMetric.create(dto.metric),
      requiredCount: Integer.create('Achievement Required Count', dto.requiredCount),
      reward: Integer.create('Achievement Reward', dto.reward),
      position: OrdinalNumber.create('Achievement Position', dto.position),
      icon: Image.create(dto.icon),
      description: dto.description,
    }, dto?.id)
  }

  get metric() {
    return this.props.metric
  }

  get reward() {
    return this.props.reward
  }

  get name() {
    return this.props.name
  }

  get icon() {
    return this.props.icon
  }

  get description() {
    return this.props.description
  }

  get requiredCount() {
    return this.props.requiredCount
  }

  get position() {
    return this.props.position
  }

  get dto(): AchievementDTO {
    return {
      id: this.id,
      name: this.name.value,
      icon: this.icon.value,
      reward: this.reward.value,
      requiredCount: this.requiredCount.value,
      position: this.position.value,
      description: this.description,
      metric: String(this.metric.value),
    }
  }
}
