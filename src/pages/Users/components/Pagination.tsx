import React, {use, useTransition} from 'react';
import {ITask, PaginatedResponse} from "../../../shared/api";


interface IPagination {
    page: number,
    tasksPaginated: Promise<PaginatedResponse<ITask>>,
    onChangePage?: (page: number) => void
}

const Pagination: React.FC<IPagination> = ({page, tasksPaginated, onChangePage}) => {
    const {
        last,
        first,
        next,
        prev,
        pages
    } = use(tasksPaginated);
    const [isLoading, startTransition] = useTransition();

    const handlePageChange = (page: number) => {
        startTransition(() => onChangePage?.(page));
    }

    return (
        <nav
            className={`${isLoading ? 'opacity-50' : ''} flex items-center justify-between`}>
            <div className={'grid gap-2 grid-cols-4'}>
                <button
                    className={'px-3 py-2 rounded-1'}
                    disabled={isLoading}
                    onClick={() => handlePageChange(first)}>
                    First ({first})
                </button>
                {prev &&
                    <button
                        className={'px-3 py-2'}
                        disabled={isLoading}
                        onClick={() => handlePageChange(prev)}>
                        Prev ({prev})
                    </button>
                }
                {next &&
                    <button
                        className={'px-3 py-2'}
                        disabled={isLoading}
                        onClick={() => handlePageChange(next)}>
                        Next ({next})
                    </button>
                }
                <button
                    className={'px-3 py-2 rounded-r'}
                    disabled={isLoading}
                    onClick={() => handlePageChange(last)}>
                    Last ({last})
                </button>
            </div>
            <span className={'text-sm'}>
                Page {page} of {pages}
            </span>
        </nav>
    );
};

export default Pagination;
