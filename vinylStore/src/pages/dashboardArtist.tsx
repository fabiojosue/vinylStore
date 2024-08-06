import React, { useEffect, useState } from 'react';
import '../Styles/dashboard.css';
import AddArtistModal from '../components/Modals/AddArtistModal';
import { deleteArtist, getArtists } from '../Service/ArtistService';
import { Artist } from '../Interfaces/Interfaces';

const DashboardArtist: React.FC = () => {
    const [sortConfig, setSortConfig] = useState<{ _id: keyof Artist; direction: string } | null>(null);
    const [isAddArtistModalOpen, setIsAddArtistModalOpen] = useState(false);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [currentArtistId, setCurrentArtistId] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const sortData = (_id: keyof Artist) => {
        let direction = 'asc';
        if (sortConfig && sortConfig._id === _id && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        const sortedData = [...artists].sort((a, b) => {
            if (a[_id]! < b[_id]!) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[_id]! > b[_id]!) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setSortConfig({ _id, direction });
        setArtists(sortedData);
    };

    const getClassNamesFor = (_id: keyof Artist) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig._id === _id ? sortConfig.direction : undefined;
    };

    const handleAddArtistClick = () => {
        setCurrentArtistId(''); // Clear the current artist ID
        setIsAddArtistModalOpen(true);
    };

    const handleEditArtistClick = (id: string) => {
        setCurrentArtistId(id); // Set the current artist ID
        setIsAddArtistModalOpen(true);
    };

    const handleCloseArtistModal = () => {
        setIsAddArtistModalOpen(false);
    };

    const handleDelete = async (id: string) => {
        try {
            console.log('Deleting artist:', id);
            await deleteArtist(id);
            setArtists(prevArtists => prevArtists.filter(artist => artist._id !== id));
            console.log('Artist deleted successfully:', id);
        } catch (error) {
            console.error('Error deleting artist:', error);
        }
    };

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const data = await getArtists();
                setArtists(data);
            } catch (error) {
                console.error('Failed to fetch artists', error);
            }
        };

        fetchArtists();
    }, []);

    // Pagination logic
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedArtists = artists.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(artists.length / itemsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="content">
            <h1>Artists Control</h1>
            <div className="table">
                <div className="table-header">
                    <div className="header__item">
                        <a id="photo" className={`filter__link`}>Photo</a>
                    </div>
                    <div className="header__item" onClick={() => sortData('name')}>
                        <a id="name" className={`filter__link ${getClassNamesFor('name')}`} href="#">Name</a>
                    </div>
                    <div className="header__item">
                        <a id="update" className={`filter__link`}>Update</a>
                    </div>
                    <div className="header__item">
                        <a id="delete" className={`filter__link`}>Delete</a>
                    </div>
                </div>

                <div className="table-content">
                    {selectedArtists.map((row, index) => (
                        <div className="table-row" key={index}>
                            <div className="table-data">
                                <img src={row.imageURL} className='' alt="artist image" />
                            </div>
                            <div className="table-data">{row.name}</div>
                            <div className="table-data">
                                <button className='updateBtn' onClick={() => handleEditArtistClick(row._id!)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                    </svg>
                                </button>
                            </div>
                            <div className="table-data">
                                <button className='deleteBtn' onClick={() => handleDelete(row._id!)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                </svg>
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                </svg>
                </button>
            </div>

            <button className="addBtn" onClick={handleAddArtistClick}>Add Artist</button>
            {isAddArtistModalOpen && <AddArtistModal _id={currentArtistId!} onClose={handleCloseArtistModal} />}
        </div>
    );
};

export default DashboardArtist;
