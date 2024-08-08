import React, { useEffect, useState } from 'react';
import { getArtists } from '../../Service/ArtistServiceGraphql';
import { createVinyl, updateVinyl, getVinylById } from '../../Service/VinylServiceGraphql';
import './Modals.css';
import { Vinyl, Artist } from '../../Interfaces/Interfaces';

interface AddVinylModalProps {
  onClose: () => void;
  onSubmit: (vinyl: Vinyl, type: string) => void;
  _id: string;
}


const AddVinylModal: React.FC<AddVinylModalProps> = ({ _id, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [price, setPrice] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isPriceValid, setIsPriceValid] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getArtists();
        console.log(data);
        setArtists(data);
      } catch (error) {
        console.error('Failed to fetch artists', error);
      }
      if (_id){
        const fetchVinyls = async () => {
          try{
            const vinyl = await getVinylById(_id);
          setTitle(vinyl.title);
          setArtist(vinyl.artist);
          setPrice(vinyl.price.toString());
          setCoverImage(vinyl.coverImage);
          } catch (error) {
            console.error('Failed to fetch vinyl', error);
          }
        };
        fetchVinyls();
      }

    };

    fetchArtists();
  }, [_id]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = Number(value);
    if (isNaN(numValue)) {
      setIsPriceValid(false);
      setPrice('');
    } else {
      setIsPriceValid(true);
      setPrice(numValue.toString());
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const vinyl = { title, artist, price: Number(price), coverImage };
    try {
      if (_id) {
        console.log('Updating vinyl:', vinyl);
        const updatedVinyl = await updateVinyl(_id, vinyl);
        onSubmit(updatedVinyl, 'update');
        console.log('Vinyl updated successfully:', _id);
      } else {
        console.log('Creating vinyl:', vinyl);
        const createdVinyl = await createVinyl(vinyl);
        onSubmit(createdVinyl, 'add');
        console.log('Vinyl created successfully:', createdVinyl);
      }
      onClose();
    } catch (error) {
      console.error('Error creating vinyl:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{_id ? 'Edit Vinyl' : 'Add Vinyl'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
            </svg>
            <select value={artist} onChange={(e) => setArtist(e.target.value)} required>
              <option value="" disabled>Select Artist</option>
              {artists.map((artist) => (
                <option key={artist._id} value={artist._id}>
                  {artist.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-vinyl-fill" viewBox="0 0 16 16">
              <path d="M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0"/>
            </svg>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder='Vinyl Title'/>
          </div>

          <div className="input-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-dollar" viewBox="0 0 16 16">
              <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z"/>
            </svg>
            <input type="text" value={price} onChange={handlePriceChange} required placeholder='Price'/>
            
          </div>
          {!isPriceValid && <p className="error">Please enter a valid number</p>}

          <div className="input-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
              <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
            </svg>
            <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} required placeholder='Image URL'/>
          </div>
          <button type="submit">{_id ? 'Update Vinyl' : 'Add Vinyl'}</button>
        </form>
      </div>
    </div>
  );
};

export default AddVinylModal;
