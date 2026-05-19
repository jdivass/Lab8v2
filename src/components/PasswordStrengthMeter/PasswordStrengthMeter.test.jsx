
import { render, screen } from '@testing-library/react'
import { PasswordStrengthMeter } from './PasswordStrengthMeter'
import  userEvent from 'vitest/browser'

describe('PasswordStrengthMeter', () => {
  describe('Renderizado', () => {
    it('renderiza un input de contraseña', () => {
      render(<PasswordStrengthMeter />)
      expect(screen.getByRole('textbox', { name: /contraseña/i })).toBeInTheDocument()
    })

    // Probar contraseña vacía
    it('renderiza el indicador de fortaleza con estado inicial "vacía"', () => {
      render(<PasswordStrengthMeter />)
      expect(screen.getByText(/vacía/i)).toBeInTheDocument()
    })

    // Probar contraseña debil
    it(`escribir una contraseña corta muestra "debil"`, async () => {
      render(<PasswordStrengthMeter />)
      const user = userEvent.setup()
      const textbox = screen.getByRole('textbox', {name:/contrasea/i})
      await user.type(textbox, '123');
      expect(screen.getByText(/débil/i)).toBeInTheDocument()
    })
  })
})