import { useState } from "react";
import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('')

  const handleChange = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
    dispatch(filterChange(newFilter))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <input
      type='text'
      name='filter'
      value={filter}
      onChange={handleChange}
      />
    </div>
  )
}

export default Filter