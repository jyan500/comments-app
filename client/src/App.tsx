import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CommentPage } from "./pages/CommentPage"

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CommentPage />} />
                {/* Catch-all — redirect unknown routes to upload */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;