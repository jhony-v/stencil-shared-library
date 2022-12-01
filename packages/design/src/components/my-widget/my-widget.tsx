import { Component, Host, h, Prop, Listen, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'design-widget',
  shadow: true,
})
export class MyWidget {
  timer: number;

  @Event({ eventName: "changeUsername" }) changeUsername: EventEmitter<string>
  @Prop({ mutable: true }) username: string = ""

  @Listen("click") 
  updateUsername() {
    this.username = "" + Math.random()
    this.changeUsername.emit(this.username)
  }

  render() {

    return (
      <Host>
        <h1>{this.username}</h1>
        <slot></slot>
      </Host>
    );
  }

}
