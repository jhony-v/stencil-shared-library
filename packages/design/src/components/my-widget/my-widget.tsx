import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'my-widget',
  shadow: true,
})
export class MyWidget {

  render() {
    return (
      <Host>
        <div>mi widget de ejemplo</div>
        <slot></slot>
      </Host>
    );
  }

}
