import React, { useEffect, useState } from 'react';
import { createArtist, updateArtist, getArtistById } from '../../Service/ArtistServiceGraphql';
import './Modals.css';
import { Artist } from '../../Interfaces/Interfaces';

interface AddArtistModalProps {
    onClose: () => void;
    _id: string;
    onSubmit: (artist: Artist, type: string) => void;
}

const AddArtistModal: React.FC<AddArtistModalProps> = ({ _id, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [biography, setBiography] = useState('');
    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        if (_id) {
            const fetchArtist = async () => {
                try {
                    const artist = await getArtistById(_id);
                    setName(artist.name);
                    setBiography(artist.biography);
                    setImageURL(artist.imageURL);
                } catch (error) {
                    console.error('Failed to fetch artist', error);
                }
            };

            fetchArtist();
        }
    }, [_id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Ensure all required fields are filled out
            if (!name || !biography || !imageURL) {
                throw new Error('All fields are required');
            }
    
            const artistData = { name, biography, imageURL };
    
            if (_id) {
                const updatedArtist = await updateArtist(_id, artistData);
                onSubmit(updatedArtist, 'update');
            } else {
                const newArtist = await createArtist(artistData);
                onSubmit(newArtist, 'add');
            }
    
            onClose();
        } catch (error) {
            console.error('Error submitting artist:', error);
        }
    };
    

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{_id ? 'Edit Artist' : 'Add Artist'}</h2>
                <form onSubmit={handleSubmit}>
                     <div className="input-container">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                             <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                             <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
                         </svg>
                         <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder='Artist Name'/>
                     </div>

                     <div className="input-container">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                             <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                             <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
                         </svg>
                         <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required placeholder='Image URL'/>
                     </div>

                     <div className="input-container">
                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                             <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                         </svg>
                         <input type="text" value={biography} onChange={(e) => setBiography(e.target.value)} required placeholder='Biography'/>
                     </div>

                    <button type="submit">{_id ? 'Update Artist' : 'Add Artist'}</button>
                </form>
            </div>
        </div>
    );
};

export default AddArtistModal;
