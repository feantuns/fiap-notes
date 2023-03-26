import { Action, AnyAction } from 'redux'
import { NotesActionsTypes, NoteState } from './notes.types'

const initialState: NoteState = {
  notes: [],
  newNote: null,
  isLoadingGetNotes: false,
  isSuccessPostNote: undefined,
  isLoadingDeleteNote: false,
  deleteNoteId: undefined,
  isSuccessPutNote: undefined,
  search: '',
  isSortingNotesByPriority: false
}

export default function (state = initialState, action: AnyAction) {
  switch (action.type) {
    case NotesActionsTypes.GET_NOTES_REQUEST:
      return { ...state, isLoadingGetNotes: true }

    case NotesActionsTypes.GET_NOTES_SUCCESS:
      return { ...state, isLoadingGetNotes: false, notes: action.payload }

    case NotesActionsTypes.POST_NOTE_REQUEST:
      return { ...state, isSuccessPostNote: undefined }

    case NotesActionsTypes.POST_NOTE_SUCCESS:
      return {
        ...state,
        isSuccessPostNote: true,
        notes: [...state.notes, action.payload]
      }

    case NotesActionsTypes.POST_NOTE_FAILURE:
      return {
        ...state,
        isSuccessPostNote: false
      }

    case NotesActionsTypes.PUT_NOTE_REQUEST:
      return {
        ...state,
        isSuccessPutNote: undefined
      }

    case NotesActionsTypes.PUT_NOTE_SUCCESS:
      return {
        ...state,
        isSuccessPostNote: true,
        notes: state.notes.map(note =>
          note.id === action.payload?.id ? action.payload : note
        )
      }

    case NotesActionsTypes.PUT_NOTE_FAILURE:
      return {
        ...state,
        isSuccessPostNote: false
      }

    case NotesActionsTypes.DELETE_NOTE_REQUEST:
      return {
        ...state,
        isLoadingDeleteNote: true,
        deleteNoteId: action.payload
      }

    case NotesActionsTypes.DELETE_NOTE_SUCCESS:
      return {
        ...state,
        isLoadingDeleteNote: false,
        notes: state.notes.filter(note => note.id !== action.payload),
        deleteNoteId: undefined
      }

    case NotesActionsTypes.SEARCH_NOTES:
      return {
        ...state,
        search: action.payload
      }

    case NotesActionsTypes.SORT_NOTES_BY_PRIORITY:
      return {
        ...state,
        isSortingNotesByPriority: action.payload
      }

    default:
      return state
  }
}
