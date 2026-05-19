
import { render, screen } from '@testing-library/react'
import { PasswordStrengthMeter } from './PasswordStrengthMeter'

describe('PasswordStrengthMeter', () => {
  describe('Renderizado', () => {
    it('renderiza un input de contraseña', () => {
      render(<PasswordStrengthMeter />)
      expect(screen.getByRole('textbox', { name: /contraseña/i })).toBeInTheDocument()
    })

    it('renderiza el indicador de fortaleza con estado inicial "vacía"', () => {
      render(<PasswordStrengthMeter />)
      expect(screen.getByText(/vacía/i)).toBeInTheDocument()
    })
  })
})