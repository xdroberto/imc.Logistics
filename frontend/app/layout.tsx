import { DevelopmentRoleProvider } from '../contexts/DevelopmentRoleContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {process.env.NODE_ENV === 'development' ? (
          <DevelopmentRoleProvider>{children}</DevelopmentRoleProvider>
        ) : (
          children
        )}
      </body>
    </html>
  )
}

