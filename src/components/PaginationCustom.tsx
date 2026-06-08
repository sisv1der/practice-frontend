import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/Pagination'

export interface PaginationProps {
    onNext: () => void
    onPrevious: () => void
    onClick: (index: number) => void
    totalPages: number
    page
}

const PaginationCustom = ({
    onNext,
    onPrevious,
    onClick,
    totalPages,
    page
}: PaginationProps) => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={onPrevious}
                        text="Назад"
                    />
                </PaginationItem>
                {Array.from({ length: totalPages}).map((_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            isActive={page === index}
                            onClick={() => onClick(index)}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        onClick={onNext}
                        text="Вперёд"
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationCustom