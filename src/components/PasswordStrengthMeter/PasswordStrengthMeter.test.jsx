
import { render, screen } from '@testing-library/react'
import { PasswordStrengthMeter } from './PasswordStrengthMeter.jsx'
import userEvent from '@testing-library/user-event'

//Tests de renderizado
describe('PasswordStrengthMeter', () => {
  describe('Renderizado', () => {
    it('renderiza un input de contraseña', () => {
      render(<PasswordStrengthMeter />)
      expect(screen.getByLabelText(/contrase/i))
    })

    // Probar contraseña vacía
    it('renderiza el indicador de fortaleza con estado inicial "vacía"', () => {
      render(<PasswordStrengthMeter />)
      expect(screen.getByText(/vacía/i)).toBeInTheDocument()
    })

//Tests de comportamiento
    // Probar contraseña debil
    it(`escribir una contraseña corta muestra "debil"`, async () => {
      render(<PasswordStrengthMeter />)
      const user = userEvent.setup()
      const textbox = screen.getByLabelText(/contrase/i)
      await user.type(textbox, 'hola');
      expect(screen.getByText(/débil/i)).toBeInTheDocument()
    })

     // Probar contraseña media
    it(`escribir una contraseña de 8 caracteres o más sin números ni símbolos muestra "media"`, async () => {
      render(<PasswordStrengthMeter />)
      const user = userEvent.setup()
      const textbox = screen.getByLabelText(/contrase/i)
      await user.type(textbox, 'holasoyyo');
      expect(screen.getByText(/media/i)).toBeInTheDocument()
    })

    // Probar contraseña fuerte
    it(`escribir una contraseña de 8 caracteres o mas con al menos un numero muestra "fuerte"`, async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      const textbox = screen.getByLabelText(/contrase/i)
      await user.type(textbox, 'holasoyyo1');
      expect(screen.getByText(/fuerte/i)).toBeInTheDocument()
    })

    // Probar contraseña muy fuerte
    it(`escribir una contraseña de 8 caracteres o mas con numero y simbolo muestra "muy fuerte"`, async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      const textbox = screen.getByLabelText(/contrase/i)
      await user.type(textbox, 'holasoyyo12#@');
      expect(screen.getByText(/muy fuerte/i)).toBeInTheDocument()
    })
// Tests de edge cases
    //Contraseña no debe ser considerada debil
    it(`Una contraseña de 8 caracteres sin numeros no debe ser considerada debil`, async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      const textbox = screen.getByLabelText(/contrase/i)
      await user.type(textbox, 'holaaaaa');
      expect(screen.queryByText(/débil/i)).not.toBeInTheDocument()
    })

    //Contraseña no debe ser considerada media
    it(`Una contraseña de exactamente 7 caracteres no debe ser considerada media`, async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      const textbox = screen.getByLabelText(/contrase/i)
      await user.type(textbox, 'holaaaa');
      expect(screen.queryByText(/media/i)).not.toBeInTheDocument()
    })

    //Contraseña sigue siendo debil
    it(`Una contraseña con solo símbolos y menos de 8 caracteres sigue siendo debil`, async () => {
      const user = userEvent.setup()
      render(<PasswordStrengthMeter />)
      const textbox = screen.getByLabelText(/contrase/i)
      await user.type(textbox, '#$/()');
      expect(screen.getByText(/débil/i)).toBeInTheDocument()
    })
  })
})