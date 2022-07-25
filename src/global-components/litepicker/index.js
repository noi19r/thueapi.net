import { reactive } from 'vue'
import dayjs from 'dayjs'
import Litepicker from 'litepicker'

let litePickerInstance = reactive({})

const getDateFormat = (format) => {
  return format !== undefined ? format : 'D MMM, YYYY'
}

const dateFilter = reactive({
  start: '',
  end: ''
})

const setValue = (props, emit) => {
  const format = getDateFormat(props.options.format)
  if (!props.modelValue.length) {
    let date = dayjs().add(-1, 'month').format(format)

    date += !props.options.singleMode && props.options.singleMode !== undefined ? ' - ' + dayjs().format(format) : ''

    dateFilter.start = dayjs().add(-1, 'month').startOf('day').valueOf()
    dateFilter.end = !props.options.singleMode && props.options.singleMode !== undefined ? dayjs().valueOf() : ''
    emit('update:modelValue', date)
  }
}

const init = (el, props, emit) => {
  const format = getDateFormat(props.options.format)
  litePickerInstance = new Litepicker({
    element: el,
    ...props.options,
    format: format,

    setup: (picker) => {
      picker.on('selected', (startDate, endDate) => {
        let date = dayjs(startDate.dateInstance).format(format)
        date += endDate !== undefined ? ' - ' + dayjs(endDate.dateInstance).format(format) : ''
        dateFilter.start = dayjs(startDate.dateInstance).startOf('day').valueOf()
        dateFilter.end = endDate !== undefined ? +dayjs(endDate.dateInstance).endOf('day').valueOf() : ''
        emit('update:modelValue', date)
      })
    }
  })

  el.Litepicker = litePickerInstance
}

const reInit = (el, props, emit) => {
  litePickerInstance.destroy()
  init(el, props, emit)
}

export { setValue, init, reInit, dateFilter }
