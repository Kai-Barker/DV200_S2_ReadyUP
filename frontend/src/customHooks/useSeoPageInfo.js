import { useEffect } from 'react';

const useSeoPageInfo = ({title, description}) => {
    useEffect(() => {
        if (title) {
            document.title = title;
        }

        let metaDescription = document.querySelector('meta[name="description"]');

        if (description) {
            if (!metaDescription) {
                metaDescription =  document.createElement('meta');
                metaDescription.setAttribute('name', 'description');
                document.head.appendChild(metaDescription);
            }
            metaDescription.setAttribute('content', description);
        }
    }, [title, description]);
};

export default useSeoPageInfo;