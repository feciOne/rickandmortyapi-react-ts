import React, { useEffect } from 'react';
import './characterDetail.css';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCharacterAsync, getEpisodesAsync, selectedCharacter, selected } from '../../features/character/characterSlice';
import { useAppSelector } from '../../app/hooks';

function CharacterDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const character = useAppSelector(selectedCharacter);
    const episodes = useAppSelector(selected)?.episodes?.map((episode, i) => <li key={i}>{episode}</li>);

    useEffect(() => {
        dispatch(getCharacterAsync(Number(id)));
    }, [dispatch, id]);

    useEffect(() => {
        if (character) {
            const query = character.episode.slice(-5).reverse().map((url: string) => url.slice(-2).replace('/', ''));
            dispatch(getEpisodesAsync(query.join(',')));
        }
    }, [dispatch, character]);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-3'>
                    <Link to="/">&larr; Back to Home</Link>
                </div>
            </div>
            <hr />
            <article>
                <div className="row">
                    <div className="col-4">
                        <img src={character?.image} alt={character?.name} />
                    </div>
                    <div className="col-8">
                        <h2>#{character?.id} - {character?.name}</h2>
                        <p className='my-4'><span className='fw-bold'>Location: </span>{character?.location.name}</p>
                        <h3>Last Five Episodes:</h3>
                        <ol>
                            {episodes}
                        </ol>
                    </div>
                </div>
            </article>
        </div>
    );
}

export default CharacterDetail;