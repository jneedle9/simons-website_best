import blockTools from '@sanity/block-tools'
import Schema from '@sanity/schema'

//This is for HTML to sanity PortableText

const defaultSchema = Schema.compile({
    title: 'Block Content',
    name: 'blockContent',
    type: 'array',
    of: [
      {
        title: 'Block',
        type: 'block',
        // Styles let you set what your user can mark up blocks with. These
        // correspond with HTML tags, but you can set any title or value
        // you want and decide how you want to deal with it where you want to
        // use your content.
        styles: [
          {title: 'Normal', value: 'normal'},
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'Quote', value: 'blockquote'},
        ],
        lists: [{title: 'Bullet', value: 'bullet'}],
        // Marks let you mark up inline text in the block editor.
        marks: {
          // Decorators usually describe a single property – e.g. a typographic
          // preference or highlighting by editors.
          decorators: [
            {title: 'Strong', value: 'strong'},
            {title: 'Emphasis', value: 'em'},
          ],
          // Annotations can be any object structure – e.g. a link or a footnote.
          annotations: [
            {
              title: 'URL',
              name: 'link',
              type: 'object',
              fields: [
                {
                  title: 'URL',
                  name: 'href',
                  type: 'url',
                },
              ],
            },
          ],
        },
      },
      // You can add additional types here. Note that you can't use
      // primitive types such as 'string' and 'number' in the same array
      // as a block type.
      {
        type: 'image',
        options: {hotspot: true},
      },
    ],
  }
  )



  // The compiled schema type for the content type that holds the block array
const blockContentType = defaultSchema.get('blogPost')
.fields.find(field => field.name === 'body').type


// Convert HTML to block array
export const blocks = blockTools.htmlToBlocks(
'<html><body><textarea value = "sample text"></textarea><body></html>',
blockContentType
)
// Outputs
//
//  {
//    _type: 'block',
//    style: 'h1'
//    children: [
//      {
//        _type: 'span'
//        text: 'Hello world!'
//      }
//    ]
//  }


// Get the feature-set of a blockContentType
const features = blockTools.getBlockContentFeatures(blockContentType)
