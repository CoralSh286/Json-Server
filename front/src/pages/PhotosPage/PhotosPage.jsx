import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useApiRequest } from '../../service/api';
import DisplayData from '../../components/DisplayData/DisplayData';
import "./style.css";
import PageHeader from '../../components/PageHeader/PageHeader';
import Photo from '../../components/Photo/Photo';
import Pagination from '../../components/Pagination/Pagination';

export default function PhotosPage() {
    // Get albumId from URL params
    const { albumId } = useParams();
    
    const [photos, setPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [photosPerPage] = useState(12);
    
    const { data, loading, error } = useApiRequest({
        url: `/photos?albumId=${albumId}`,
        initialData: []
    });

    useEffect(() => {
        if (data) {
            setPhotos(data);
        }
    }, [data]);

    // Get current photos
    const indexOfLastPhoto = currentPage * photosPerPage;
    const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
    const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

    // Calculate total pages
    const totalPages = Math.ceil(photos.length / photosPerPage);

    // Change page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll to top when changing pages
        window.scrollTo(0, 0);
    };

    return (
        <div className="photos-page">
            <PageHeader title={`Photos for Album #${albumId}`} />
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
                                        key={p.id}
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