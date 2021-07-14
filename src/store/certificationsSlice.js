import {createSlice} from '@reduxjs/toolkit'

export const certificationsSlice = createSlice({
  name: 'certifications',
  initialState: [{
    id: 'cms-for-developers',
    name: 'Hubspot CMS for Developers',
    badgeUrl: '/assets/certifications/cms-for-developers.png'
  }, {
    id: 'contextual-marketing',
    name: 'Contextual Marketing',
    badgeUrl: '/assets/certifications/contextual-marketing.png'
  }, {
    id: 'growth-driven-design-agency',
    name: 'Growth-Driven Design Agency',
    badgeUrl: '/assets/certifications/growth-driven-design.png'
  }, {
    id: 'sales-software',
    name: 'HubSpot Sales Software',
    badgeUrl: '/assets/certifications/sales-software.png'
  }, {
    id: 'content-marketing',
    name: 'Content Marketing',
    badgeUrl: '/assets/certifications/content-marketing.png'
  }, {
    id: 'growth-driven-design',
    name: 'Growth-Driven Design',
    badgeUrl: '/assets/certifications/growth-driven-design.png'
  }, {
    id: 'sales-enablement',
    name: 'Sales Enablement',
    badgeUrl: '/assets/certifications/sales-enablement.png'
  }]
})

export default certificationsSlice.reducer
