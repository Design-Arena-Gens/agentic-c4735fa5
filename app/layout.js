export const metadata = {
  title: 'JAC Board 10th Study Agent',
  description: 'Your AI study planner for JAC Board 10th class exams',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
