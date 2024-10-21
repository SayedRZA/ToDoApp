import React, { useState, useEffect } from 'react';
import './NotesWidget.css';

const NotesWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [note, setNote] = useState('');

    useEffect(() => {
        const savedNote = localStorage.getItem('userNote');
        if (savedNote) {
            setNote(savedNote);
        }
    }, []);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSave = () => {
        localStorage.setItem('userNote', note);
        alert('Note saved!');
        setIsOpen(false);
    };

    return (
        <div className="notes-widget">
            <button onClick={handleOpen} className="open-button">Notes</button>
            {isOpen && (
                <div className="note-editor">
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Write your notes here..."
                        rows={10}
                        className="note-textarea"
                    />
                    <div className="note-actions">
                        <button onClick={handleSave} className="save-button">Save</button>
                        <button onClick={handleClose} className="close-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotesWidget;
