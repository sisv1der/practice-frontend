import { CardContent, CardHeader, CardTitle, Card } from '@/components/ui/Card'
import type { AppealComment } from '@/types/AppealComment'

export interface CommentCardProps {
    comment: AppealComment
}

const CommentCard = ({comment}: CommentCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {new Date(comment.createdAt).toLocaleString()}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {comment.text}
            </CardContent>
        </Card>
    )
}

export default CommentCard