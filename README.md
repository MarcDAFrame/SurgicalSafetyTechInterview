# Backend
running the backend
```bash
# run Jupyter notebook
python3 -m notebook # this is how I do it, windows users may have an exe to run
```
## Backend: things of note
- I've been a little pressed for time so I wasn't as thorough as I would have liked to be
- In the future I would have used pytest and written a full test suite for the functions
    - `group_by`
    - `add_levels`
- I would have also written a proper docstring


# Frontend
![surgical-software-frontend-demo.png](<./surgical-software-frontend-demo.png>)

```bash
# run the dev server
npm run dev
```

## Frontend: things of note
- uses Vite for lightning fast build / start times
    - utilizing the browsers native ES Modules importing features, Vite is magnitudes faster than the current industry standards that opt to bundle the code instead (i.e. Webpack)
- The visualization is written in D3.js, the industry standard for making fully customizable and performant visualizations.
    - I chose to use D3.js because I have history with it, and it's an impressive skill to have
    - some other D3.js project of mine can be seen here
        - https://ttc.baicanalytics.io/
        - https://subwaysim.mframe.ca/