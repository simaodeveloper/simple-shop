export const createHeader = () => `
  <div>Details</div>
  <button data-action="close">Close</button>
`;

export const createContent = () => `
  <h3>Title</h3>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
    nulla Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Itaque, nulla!
  </p>
  <form action="">
    <button data-action="confirm">Confirm</button>
    <button data-action="cancel">Cancel</button>
  </form>
`;

export const createFooter = () => `
  <p><small>Created by: Daniel Simão</small></p>
`;

export const create = ({ header, content, footer } = {}) => `
  <div class='modal'>
    <div class='modal__overlay' data-action="close"></div>
    <div class='modal__wrapper'>
      <div class='modal__container'>
        <div class='modal__header'>
          ${header ? header : createHeader()}
        </div>
        <div class='modal__content'>
          <div class='modal__custom-content'>
            ${content ? content : createContent()}
          </div>
        </div>
        <div class='modal__footer'>
          ${footer ? footer : createFooter()}
        </div>
      </div>
    </div>
  </div>
`;
