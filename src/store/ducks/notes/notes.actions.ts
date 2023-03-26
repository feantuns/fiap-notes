import {
  ActionType,
  Note,
  NotesActionsTypes,
  PayloadActionType,
  PostNoteRequest
} from './notes.types'
import { action } from 'typesafe-actions'

export const getNotesRequest = (): ActionType =>
  action(NotesActionsTypes.GET_NOTES_REQUEST)

export const getNotesSuccess = (response: Note[]): ActionType =>
  action(NotesActionsTypes.GET_NOTES_SUCCESS, response)

export const postNoteRequest = (newNote: PostNoteRequest): PayloadActionType =>
  action(NotesActionsTypes.POST_NOTE_REQUEST, newNote)

export const postNoteSuccess = (response: Note): PayloadActionType =>
  action(NotesActionsTypes.POST_NOTE_SUCCESS, response)

export const postNoteFailure = (): ActionType =>
  action(NotesActionsTypes.POST_NOTE_FAILURE)

export const putNoteRequest = (updatedNote: Note): PayloadActionType =>
  action(NotesActionsTypes.PUT_NOTE_REQUEST, updatedNote)

export const putNoteSuccess = (response: Note): PayloadActionType =>
  action(NotesActionsTypes.PUT_NOTE_SUCCESS, response)

export const putNoteFailure = (): ActionType =>
  action(NotesActionsTypes.PUT_NOTE_FAILURE)

export const deleteNoteRequest = (noteId: number): ActionType =>
  action(NotesActionsTypes.DELETE_NOTE_REQUEST, noteId)

export const deleteNoteSuccess = (noteId: number): ActionType =>
  action(NotesActionsTypes.DELETE_NOTE_SUCCESS, noteId)

export const searchNotes = (search: string): ActionType =>
  action(NotesActionsTypes.SEARCH_NOTES, search)

export const sortNotesByPriority = (
  isSortingNotesByPriority: boolean
): ActionType =>
  action(NotesActionsTypes.SORT_NOTES_BY_PRIORITY, isSortingNotesByPriority)
