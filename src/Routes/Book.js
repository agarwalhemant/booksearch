import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import wretch from "wretch";
import Markdown from "react-markdown";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { Grid, Column } from "@carbon/react";
import "../Styles/Book.scss";
import AuthorNames from "../Components/AuthorNames";
import placeholderImage from "../PlaceholderImage.js";

export default function Book() {
  const params = useParams();
  const key = params.key;
  const keyId = params.keyId;

  const [data, setData] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const [cover, setCover] = useState(null);

  let title, bookDescription, subjects, authorNames;

  useEffect(() => {
    wretch(`https://openlibrary.org/${key}/${keyId}.json`)
      .get()
      .json()
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(`This is an HTTP error: The status is ${error.message}`);
        setLoading(false);
      });
  }, [key, keyId]);

  if (data) {
    if (data.title) {
      title = data.title;
      console.log(data);
    }

    if (data.description !== undefined) {
      if (data.description.value !== undefined) {
        bookDescription = (
          <div>
            <div className="header">
              <h4>Description</h4>
            </div>{" "}
            <Markdown>{data.description.value}</Markdown>
          </div>
        );
      } else {
        bookDescription = (
          <div>
            <div className="header">
              <h4>Description</h4>
            </div>{" "}
            <Markdown>{data.description}</Markdown>
          </div>
        );
      }
    }

    if (data.subjects !== undefined) {
      subjects = (
        <div>
          <div className="header">
            <h4>Subjects</h4>
          </div>
          <Markdown>{data.subjects.join(", ")}</Markdown>
        </div>
      );
    }

    if (data.authors) {
      authorNames = <AuthorNames authors={data.authors} />;
    }
  }

  useEffect(() => {
    if (data.covers !== undefined) {
      const loadCover = async () => {
        for (const coverId of data.covers) {
          const imageUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
          const img = new Image();

          // Wrap the image loading in a Promise
          const loadPromise = new Promise((resolve) => {
            img.onload = () => resolve({ coverId, valid: true });
            img.onerror = () => resolve({ coverId, valid: false });
          });

          img.src = imageUrl;

          // Wait for the image to load and check if it's valid
          const result = await loadPromise;

          if (result.valid) {
            // Update the state with the valid cover
            setCover(result.coverId);
            return;
          }
        }

        setCover(null);
      };

      // Call the function to load and set the cover
      loadCover();
    }
  }, [data.covers]);

  const imageSrc = cover
    ? `https://covers.openlibrary.org/b/id/${cover}-M.jpg`
    : placeholderImage;

  return (
    <Grid fullWidth>
      <Column lg={4} md={3} sm={2} className="book-cover">
        <LazyLoadImage
          effect="opacity"
          src={imageSrc}
          alt="Book cover"
          height="auto"
          width="100%"
          placeholderSrc={placeholderImage}
        />
      </Column>
      <Column lg={10} md={4} sm={4}>
        <Grid>
          <Column lg={10} md={4} sm={4}>
            <h1>{title}</h1>
            {authorNames}
          </Column>

          {subjects ? (
            <Column lg={10} md={4} sm={4} className="Subjects">
              {subjects}
            </Column>
          ) : null}
          {bookDescription ? (
            <Column lg={10} md={4} sm={4} className="Description">
              {bookDescription}
            </Column>
          ) : null}
        </Grid>
      </Column>
    </Grid>
  );
}
