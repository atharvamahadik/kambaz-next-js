"use client";
export default function Lab1() {
  return (
    <div id="wd-lab1">
      <h2>Lab 1</h2>
      <h3>HTML Examples</h3>
      <div id="wd-h-tag">
        Text documents are often broken up into several sections and
        subsections. Each section is usually prefaced with a short title or
        heading that attempts to summarize the topic of the section it precedes.
        For instance this paragraph is preceded by the heading Heading Tags. The
        font of the section headings are usually larger and bolder than their
        subsection headings. This document uses headings to introduce topics
        such as HTML Documents, HTML Tags, Heading Tags, etc. HTML heading tags
        can be used to format plain text so that it renders in a browser as
        large headings. There are 6 heading tags for different sizes: h1, h2,
        h3, h4, h5, and h6. Tag h1 is the largest heading and h6 is the smallest
        heading.
      </div>
      <div id="wd-p-tag">
        <h4>Paragraph Tag</h4>
        <p id="wd-p-1">
          The old lighthouse stood as a silent sentinel on the craggy coast, its
          whitewashed walls weathered by centuries of salt spray and relentless
          wind. Its light, a powerful beacon that had guided countless ships
          through treacherous waters, now lay dormant, a victim of automation
          and modern navigation systems. Still, the local fishermen insisted its
          presence offered a different kind of guidance—a feeling of safety and
          a link to the seafaring traditions of their ancestors. They did often
          gather on the shore at dusk, sharing stories of storms weathered and
          close calls, all under the watchful, unblinking gaze of the retired
          tower.
        </p>
        <p id="wd-p-2">
          The town itself, nestled in a small cove below the lighthouse, had a
          charm that time seemed to have forgotten. Cobblestone streets, lined
          with pastel-colored cottages and small shops, wound their way up the
          hillside. The scent of fresh-baked bread from the village bakery
          mingled with the briny air, creating a unique and comforting perfume.
          In the town square, a bronze statue of a fisherman with a net stood as
          a tribute to the community heritage, his face etched with a look of
          quiet determination that reflected the spirit of the people who lived
          there.
        </p>
        <p id="wd-p-2">
          One evening, as a thick fog rolled in from the sea, a young boy named
          Leo, the grandson of the lighthouse keeper, climbed to the top of the
          tower. He had heard the old stories and felt a deep connection to the
          building history. Reaching the lamp room, he brushed the dust from the
          massive Fresnel lens, imagining the light piercing through the
          darkness. For a moment, the old tower did not feel abandoned; it felt
          alive, filled with the echoes of a thousand journeys and the silent
          promise of a light that would one day shine again.
        </p>
      </div>
      <div id="wd-lists">
        <h4>List Tags</h4>
        <h5>Ordered List Tag</h5>
        How to make pancakes:
        <ol id="wd-pancakes">
          <li>Mix dry ingredients.</li>
          <li>Add wet ingredients.</li>
          <li>Stir to combine.</li>
          <li>Heat a skillet or griddle.</li>
          <li>Pour batter onto the skillet.</li>
          <li>Cook until bubbly on top.</li>
          <li>Flip and cook the other side.</li>
          <li>Serve and enjoy!</li>
        </ol>
        My Favorite Recipe:
        <ol id="wd-pasta">
          <li>Bring Water to a Boil.</li>
          <li>Add the Pasta.</li>
          <li>Stir to combine.</li>
          <li>Prepare your Sauce.</li>
          <li>Combine and Serve.</li>
        </ol>
        <h5>Unordered List</h5>
        My favorite books (in no particular order)
        <ul id="wd-my-books">
          <li>Dune</li>
          <li>Lord of the Rings</li>
          <li>Enders Game</li>
          <li>Red Mars</li>
          <li>The Forever War</li>
        </ul>
        Your favorite books (in no particular order)
        <ul id="wd-your-books">
          <li>To Kill a Mockingbird</li>
          <li>The Great Gatsby</li>
          <li>1984 </li>
          <li>Pride and Prejudice </li>
          <li>Harry Potter and the Prisoner of Azkaban</li>
        </ul>
        <div id="wd-tables">
          <h4>Table tag</h4>
          <table border={1} width="100%">
            <thead>
              <tr>
                <th>Quiz</th>
                <th>Topic</th>
                <th>Date</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Q1</td>
                <td>HTML</td>
                <td>09/17/2025</td>
                <td>85</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Q2</td>
                <td>CSS</td>
                <td>09/18/2025</td>
                <td>90</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Q1</td>
                <td>JavaScript</td>
                <td>09/19/2025</td>
                <td>95</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3}>Average</td>
                <td>90</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div id="wd-images">
          <h4>Image Tag</h4>
          Loading an image from the internet: <br />
          <img
            id="wd-starship"
            width="400px"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          />
          <br />
          Loading a local image
          <br />
          <img id="wd-khoury" width="400px" src="/images/Khoury.jpg" />
        </div>
        <div id="wd-forms">
          <h4>Form elements</h4>
          <form id="wd-text-fields">
            <h5>Text Fields</h5>
            <label htmlFor="wd-text-fields-username">Username:</label>
            <input placeholder="jdoe" id="wd-text-fields-username" />
            <br />
            <label htmlFor="wd-text-fields-password">Password:</label>
            <input
              type="password"
              defaultValue="123@#$asd"
              id="wd-text-fields-password"
            />
            <br />
            <label htmlFor="wd-text-fields-first-name">First name:</label>
            <input
              type="text"
              placeholder="John"
              title="First Name"
              id="wd-text-fields-first-name"
            />
            <br />
            <label htmlFor="wd-text-fields-last-name">Last name:</label>
            <input
              type="text"
              placeholder="Doe"
              title="Last Name"
              id="wd-text-fields-last-name"
            />
          </form>
        </div>
        <div id="wd-text-boxes">
          <h5>Text Boxes</h5>
          <label>Biography:</label>
          <br />
          <textarea
            id="wd-textarea"
            cols={30}
            rows={10}
            defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Non recusandae, doloribus quidem omnis rem illum neque distinctio harum nostrum maiores! Eaque iste ad blanditiis, dolore doloribus culpa quidem nam delectus."
          ></textarea>
        </div>
        <div>
          <h5 id="wd-buttons">Buttons</h5>
          <button
            type="button"
            onClick={() => alert("Life is Good!")}
            id="wd-all-good"
          >
            Hello World!
          </button>
          <h5 id="wd-radio-buttons">Radio buttons</h5>
          <label>Favorite movie genre:</label>
          <br />
          <input type="radio" name="radio-genre" id="wd-radio-comedy" />
          <label htmlFor="wd-radio-comedy">Comedy</label>
          <input type="radio" name="radio-genre" id="wd-radio-drama" />
          <label htmlFor="wd-radio-drama">Drama</label>
          <input type="radio" name="radio-genre" id="wd-radio-scifi" />
          <label htmlFor="wd-radio-scifi">Science Fiction</label>
          <input type="radio" name="radio-genre" id="wd-radio-fantasy" />
          <label htmlFor="wd-radio-fantasy">Fantasy</label>

          <h5 id="wd-checkboxes">Checkboxes</h5>
          <label>Favorite movie genre:</label>
          <br />
          <input type="checkbox" name="chekc-genre" id="wd-chkbox-comedy" />
          <label htmlFor="wd-chkbox-comedy">Comedy</label>
          <input type="checkbox" name="chekc-genre" id="wd-chkbox-drama" />
          <label htmlFor="wd-chkbox-drama">Drama</label>
          <input type="checkbox" name="chekc-genre" id="wd-chkbox-scifi" />
          <label htmlFor="wd-chkbox-scifi">Science Fiction</label>
          <input type="checkbox" name="chekc-genre" id="wd-chkbox-fantasy" />
          <label htmlFor="wd-chkbox-fantasy">Fantasy</label>
        </div>
        <div>
          <h4 id="wd-dropdowns">Dropdowns</h4>
          <h5>Select One</h5>
          <label htmlFor="wd-select-one-genre">Favorite movie genre:</label>
          <br />
          <select id="wd-select-one-genre">
            <option value="COMEDY">Comedy</option>
            <option value="DRAMA">Drama</option>
            <option value="SCIFI">Scifi</option>
            <option value="FANTASY">Fantasy</option>
          </select>

          <h5>Select many</h5>
          <label htmlFor="wd-select-many-genre">Favorite movie genres:</label>
          <br />
          <select multiple id="wd-select-many-genre">
            <option value="COMEDY" selected>
              Comedy
            </option>
            <option value="DRAMA">Drama</option>
            <option value="SCIFI" selected>
              Scifi
            </option>
            <option value="FANTASY">Fantasy</option>
          </select>

          <h4>Other HTML field types</h4>
          <label htmlFor="wd-text-fields-email">Email: </label>
          <input
            type="email"
            placeholder="jdoe@somewhere.com"
            id="wd-text-fields-email"
          />
          <br />

          <label htmlFor="wd-text-fields-salary-start">Starting salary: </label>
          <input
            type="number"
            defaultValue="100000"
            placeholder="1000"
            id="wd-text-fields-salary-start"
          />
          <br />

          <label htmlFor="wd-text-fields-rating">Rating</label>
          <input
            type="range"
            defaultValue="4"
            max="5"
            placeholder="Doe"
            id="wd-text-fields-rating"
          />
          <br />
          <label htmlFor="wd-text-fields-dob">Date of birth: </label>
          <input
            type="date"
            defaultValue="2001-11-08"
            id="wd-text-fields-dob"
          />
          <br />
        </div>
        <div id="wd-anchor-tags">
          <h4>Anchor Tag</h4>
          Please
          <a href="https://www.lipsum.com" id="wd-lipsum">
            click here
          </a>
          to get dummy text
          <br />
        </div>
      </div>
    </div>
  );
}
