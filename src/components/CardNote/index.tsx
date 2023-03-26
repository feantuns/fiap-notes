import { ChangeEvent, HTMLAttributeAnchorTarget, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate } from '../../services/utils'
import { ApplicationState } from '../../store'
import {
  deleteNoteRequest,
  putNoteRequest
} from '../../store/ducks/notes/notes.actions'
import { Note } from '../../store/ducks/notes/notes.types'
import { debounce } from '../../utils'
import { Container } from './styles'

interface NoteProps {
  note: Note
}

function CardNote({ note }: NoteProps) {
  const dispatch = useDispatch()
  const [currentNote, setCurrentNote] = useState<Note>(note)
  const [timeoutPutId, setTimeoutPutId] = useState<number | undefined>()

  const containerRef = useRef<HTMLDivElement>(null)

  const { isLoadingDeleteNote, deleteNoteId } = useSelector(
    (state: ApplicationState) => state.noteState
  )

  const handleDelete = (noteId: number) => {
    dispatch(deleteNoteRequest(noteId))
  }

  const handleChangeNoteText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentNote(prevNote => ({ ...prevNote, text: event.target.value }))
    if (timeoutPutId) clearTimeout(timeoutPutId)
    const newTimeoutPutId = setTimeout(
      () =>
        dispatch(putNoteRequest({ ...currentNote, text: event.target.value })),
      1000
    )
    setTimeoutPutId(newTimeoutPutId)
  }

  const handleChangeNoteUrgency = () => {
    const updatedNote = {
      ...currentNote,
      urgent: !currentNote.urgent
    }

    setCurrentNote(updatedNote)
    dispatch(putNoteRequest(updatedNote))
  }

  if (deleteNoteId === note.id && containerRef?.current)
    containerRef.current.style.opacity = '0.5'

  return (
    <>
      <Container ref={containerRef}>
        <p>{formatDate(new Date(currentNote?.date))}</p>
        <textarea value={currentNote.text} onChange={handleChangeNoteText} />
        {currentNote.urgent ? (
          <span
            className="material-icons"
            id="priority"
            onClick={debounce(handleChangeNoteUrgency, 300)}
          >
            priority_high
          </span>
        ) : (
          <span
            className="material-icons disabled"
            id="priority"
            onClick={debounce(handleChangeNoteUrgency, 300)}
          >
            priority_high
          </span>
        )}
        {isLoadingDeleteNote && deleteNoteId === currentNote.id ? (
          <span className="material-icons spin">cached</span>
        ) : (
          <span
            className="material-icons"
            onClick={() => handleDelete(currentNote.id)}
          >
            delete_forever
          </span>
        )}
      </Container>
    </>
  )
}

export default CardNote
