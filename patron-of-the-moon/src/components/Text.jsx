import { DRAFT_MODE } from '../content.js'
import { isFilled } from '../lib.js'

/** Renders real text normally, placeholders only in draft mode, otherwise nothing. */
export default function Text({ value, as: Tag = 'span', className = '', ...rest }) {
  if (isFilled(value)) return <Tag className={className || undefined} {...rest}>{value}</Tag>
  if (DRAFT_MODE && value && String(value).trim()) {
    return <Tag className={`${className} ph`.trim()} {...rest}>{value}</Tag>
  }
  return null
}