import { Component } from "@/component";
import {Renderer} from "@/renderer";

export const render = (entities: Array<Map<string, Component>>, renderer: Renderer) => {
    renderer.render()
}