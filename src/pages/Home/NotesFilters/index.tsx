import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Checkbox from '../../../components/Checkbox'
import { ApplicationState } from '../../../store'
import {
  searchNotes,
  sortNotesByPriority
} from '../../../store/ducks/notes/notes.actions'
import { Container } from './styles'

function NotesFilters() {
  const dispatch = useDispatch()
  const { search, isSortingNotesByPriority } = useSelector(
    (state: ApplicationState) => state.noteState
  )

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchNotes(event.target.value))
  }

  const handleSortNotesByPriority = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(sortNotesByPriority(event.target.checked))
  }

  return (
    <Container>
      <input
        placeholder="Buscar notas..."
        value={search}
        onChange={handleSearch}
        type="text"
      />

      <Checkbox
        checked={isSortingNotesByPriority}
        onChange={handleSortNotesByPriority}
        label="Notas urgentes primeiro"
      />
    </Container>
  )
}

export default NotesFilters
