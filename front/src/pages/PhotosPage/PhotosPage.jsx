import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { apiRequest, useApiRequest } from '../../service/api';
import DisplayData from '../../components/DisplayData/DisplayData';
import "./style.css";
import PageHeader from '../../components/PageHeader/PageHeader';
import Photo from '../../components/Photo/Photo';
import Pagination from '../../components/Pagination/Pagination';
import CrudBar from '../../components/CrudBar/CrudBar';
export default function PhotosPage() {
    // Get albumId from URL params
    const { albumId } = useParams();
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [photosPerPage] = useState(12);

    const { data, loading, error, refetch } = useApiRequest({
        url: `/photos?albumId=${albumId}`,
        initialData: []
    });

    useEffect(() => {
        if (data) {
            setPhotos(data);
        }
    }, [data]);

    const indexOfLastPhoto = currentPage * photosPerPage;
    const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
    const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);
    const totalPages = Math.ceil(photos.length / photosPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll to top when changing pages
        window.scrollTo(0, 0);
    };
    const onDelete = async () => {
        if (!selectedPhoto) return; // אם לא נבחרה משימה, אל תעשה כלום
        const { id } = selectedPhoto; // קח את ה-id של המשימה הנבחרת
        await apiRequest({ url: `/photos/${id}`, method: 'DELETE' }); // מחק את המשימה מה-API
        refetch()
        setSelectedPhoto(null); // נקה את הסטייט של המשימה הנבחרת
    }

    return (
        <div className="photos-page">
            <PageHeader title={`Photos for Album #${albumId}`} />
            <CrudBar editingFor={"photos"}
                onDelete={onDelete}
                refetchFunction={refetch}
                additionalData={{ albumId: albumId }}
                selected={selectedPhoto} />
            <DisplayData error={error} loading={loading} data={photos}>
                <>
                    {photos.length > 0 ? (
                        <>
                            <div className="photos-count">
                                Showing {indexOfFirstPhoto + 1}-{Math.min(indexOfLastPhoto, photos.length)} of {photos.length} photos
                            </div>
                            <div className="photos-container">
                                {currentPhotos.map(p => (
                                    <Photo
                                        selected={selectedPhoto}
                                        setSelected={setSelectedPhoto}
                                        key={p.id}
                                        id={p.id}
                                        title={p.title}
                                        url={p.url}
                                        thumbnailUrl={p.thumbnailUrl}
                                    />
                                ))}
                            </div>
                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </>
                    ) : (
                        <div className="no-photos">
                            No photos found for this album
                        </div>
                    )}
                </>
            </DisplayData>
        </div>
    )
}