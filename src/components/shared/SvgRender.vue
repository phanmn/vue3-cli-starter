<template lang="pug">
svg(ref='svg', v-bind='svgAttriutes')
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component';
import { memoize } from 'lodash-es';

// eslint-disable-next-line @typescript-eslint/no-use-before-define
const memoizedGetSvgFile = memoize(getSvgFile);

class Props {
  src!: string;
  width = prop({ default: 0 });
  height = prop({ default: 0 });
}

export default class SvgRender extends Vue.props(Props) {
  svg = '';
  svgAttriutes: { [key: string]: unknown } = {
    width: 0,
    height: 0,
  };

  mounted() {
    this.createSvgElement();
  }

  createSvgElement() {
    return memoizedGetSvgFile(this.src)
      .then(async responseText => {
        const domParser = new DOMParser();
        let elementSvg: Document | null = domParser.parseFromString(
          responseText,
          'text/xml',
        );

        const attributes: { [key: string]: unknown } = {};
        const el = elementSvg.documentElement;
        for (let i = 0; i < elementSvg.documentElement.attributes.length; i++) {
          const attrib = el.attributes[i];
          attributes[attrib.name] = attrib.value;
        }

        this.svgAttriutes = attributes;
        if (this.width) {
          this.svgAttriutes.width = this.width;
        }

        if (this.height) {
          this.svgAttriutes.height = this.height;
        }
        await this.$nextTick();
        (this.$refs.svg as SVGElement).innerHTML =
          elementSvg.documentElement.innerHTML;

        this.svg = elementSvg.documentElement.innerHTML;
        elementSvg = null;
      })
      .catch((e: Error) => {
        this._errorLog(e.message);
      });
  }

  _errorLog(log: string) {
    console.error(`[ERROR] : SvgRender, ${log}`);
  }
}

function getSvgFile(path: string) {
  const dir = window.location.origin;
  const source = path.match(/^http(s?):\/\//)
    ? path
    : path.substring(0, 1) === '/'
    ? `${dir}${path}`
    : `${dir}/${path}`;

  /*
  return fetch(source)
    .then((response) => {
      return response.text();
    });
  */

  const p = new Promise<string>((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', source, true);
    request.onload = async () => {
      if (request.status >= 200 && request.status < 400) {
        resolve(request.responseText);
      } else {
        reject(
          new Error(`Can't load element from this path.\nPath : ${source}`),
        );
      }
    };

    request.onerror = () => {
      reject(new Error(`Can't load element from this path.\nPath : ${source}`));
    };

    request.send();
  });

  return p;
}
</script>
