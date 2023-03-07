import { useDispatch } from "react-redux";
import { IPost } from "../../entities/IPost";
import { reactionAdd } from "../redux/slice/postSlice";
import { AppDispatch } from "../redux/Store";

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕'
}

interface Props {
  post: IPost
}

const ReactionButtons = ({ post }: Props) => {
  const dispatch = useDispatch<AppDispatch>()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="mr-10"
        onClick={() =>
          dispatch(reactionAdd({ postId: post.id, reaction: name }))
        }
      >
        <span className="space-x-5">{emoji} {post.reactions[name]}</span>
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}
export default ReactionButtons