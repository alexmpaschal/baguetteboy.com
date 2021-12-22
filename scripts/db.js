import mongoose from 'mongoose'
import { marked } from 'marked'
import slugify from 'slugify'
import createDomPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import unidecode from 'unidecode'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export const User = mongoose.model('User', userSchema)

const dompurify = createDomPurify(new JSDOM().window)

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  html: {
    type: String,
    required: true
  }
})

articleSchema.pre('validate', function(next) {
  if (this.title) {
    this.slug = slugify(unidecode(this.title), { lower: true, strict: true })
  }

  if (this.markdown) {
    this.html = dompurify.sanitize(marked(this.markdown))
  }

  next()
})

export const Article = mongoose.model('Article', articleSchema)