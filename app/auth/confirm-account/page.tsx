import ConfirmAccountForm from '@/components/auth/ConfirmAccountForm'

export default function confirmAccountPage() {
  return (
    <>
      <h1 className='font-black text-4xl text-purple-950 text-center'>Confirma tu cuenta</h1>
      <p className='text-3xl font-bold text-slate-400'>Ingresa tu codigo</p>

      <ConfirmAccountForm/>
    </>
  )
}
