import type { Participacion } from '../types/Participaciones'

export const getNombreCompletoParticipante = (p: Participacion): string => {
  if (p.esInvitado) {
    return `${p.invitadoApellido ?? ''}, ${p.invitadoNombre ?? ''}`
  }
  return `${p.arquero?.apellido ?? ''}, ${p.arquero?.nombre ?? ''}`
}
