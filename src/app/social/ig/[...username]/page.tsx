export default async function Instagram({
  params,
}: {
  params: { username: string[] }
}) {
  const resolvedParams = params
  return (
    <div>
      <h2>Hello, {resolvedParams.username.join(" ")}</h2>
      <h2>Hello, {params.username.join(" ")}</h2>
    </div>
  )
}
