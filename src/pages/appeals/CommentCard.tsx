import { CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import type { AppealComment } from '@/types/AppealComment'

export interface CommentCardProps {
    comment: AppealComment
}

const CommentCard = ({comment}: CommentCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {comment.createdAt}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {comment.text}
            </CardContent>
        </Card>
    )
}

export default CommentCard