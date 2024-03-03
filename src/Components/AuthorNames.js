import React, { useState, useEffect } from "react";
import wretch from "wretch";
console.log('test');
export default function AuthorNames(props) {
    const { authors } = props;
    const [authorNames, setAuthorNames] = useState([]);

    useEffect(() => {
        const authorUrls = authors.map((authorObject) => `https://openlibrary.org${authorObject.author.key}.json`);

        const promises = authorUrls.map((url) => wretch(url)
            .get()
            .json((authorData) => authorData.name));
        Promise.all(promises).then(setAuthorNames);
    }, [authors]);

    console.log(authorNames);

    if (!authors){
        return null;
    }

    return (
        <h3>
            by
            &nbsp;
            {authorNames.join(', ')}
        </h3>
    );
}