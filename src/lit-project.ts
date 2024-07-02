import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

const logo = new URL('../../assets/open-wc-logo.svg', import.meta.url).href;

declare global {
  interface UserData {
    'my-element': string;
  }
}

@customElement('lit-project')
export class LitProject extends LitElement {
  @property({ type: String }) header = 'My app';

  @property({ type: Array })
  data = [];

  connectedCallback() {
    super.connectedCallback();
    this.fetchData();
  }

  async fetchData() {
    console.log('lol');
    try {
      const response = await fetch(
        'https://thankful-wave-0794bb703.5.azurestaticapps.net/api/getFeelings',
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const res = await response.json();
      this.data = res.items; // Assuming your API returns an object with an `items` array
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error,
      );
    }
  }

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--lit-project-background-color);
    }

    main {
      flex-grow: 1;
    }

    .logo {
      margin-top: 36px;
      animation: app-logo-spin infinite 20s linear;
    }

    @keyframes app-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
  `;

  render() {
    return html`
      <main>
        <div class="logo"><img alt="open-wc logo" src=${logo} /></div>
        <ul>
          ${this.data.map(item => html`<li>${item}</li>`)}
        </ul>
      </main>
    `;
  }
}
