import { Component, h } from 'preact'

export interface IControlProps {
  label: string,
  onChange: JSX.EventHandler<Event>,
  type: string,
  value: string,
}

export default class Control extends Component<IControlProps, {}> {
  render ({ label, onChange, type, value }: IControlProps) {
    let input: JSX.Element

    switch (type) {
      case 'textarea':
        input = (
          <textarea
            value={value}
            onChange={onChange}
          />
        )
        break
      default:
        input = (
          <input
            value={value}
            onChange={onChange}
          />
        )
    }

    return (
      <label>
        <strong>{label}</strong>
        {input}
      </label>
    )
  }
}
