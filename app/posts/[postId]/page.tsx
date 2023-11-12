

export default function PostDetail({params} : {params: {postId: string}}) {
  return (
    <div>
      Posts ke {params.postId}
    </div>
  )
}
