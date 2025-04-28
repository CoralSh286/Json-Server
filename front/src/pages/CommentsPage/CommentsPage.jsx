import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useApiRequest } from '../../service/api';
import DisplayData from '../../components/DisplayData/DisplayData';
import Comment from '../../components/Comment/Comment';
import "./style.css";
import PageHeader from '../../components/PageHeader/PageHeader';

export default function CommentsPage() {
    const [searchParams] = useSearchParams();
    const postId = searchParams.get('postId');

    const [comments, setComments] = useState([]);
    const { data, loading, error } = useApiRequest({
        url: `/comments?postId=${postId}`,
        initialData: []
    });

    useEffect(() => {
        if (data) {
            setComments(data);
        }
    }, [data]);

    return (
        <div className="comments-page">
            <PageHeader title={`Comments for Post #${postId}`} />
            <DisplayData error={error} loading={loading} data={comments}>
                <div className="comments-container">
                    {comments.map(comment => (
                        <Comment
                            key={comment.id}
                            name={comment.name}
                            email={comment.email}
                            body={comment.body}
                        />
                    ))}
                </div>
            </DisplayData>
        </div>
    )
}