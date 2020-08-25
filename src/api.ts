import * as core from '@actions/core'
import Axios from 'axios'

function getBasicAuthHeader(): String {
  const tenant = core.getInput('hawkbit-tenant')
  const username = core.getInput('hawkbit-username')
  const password = core.getInput('hawkbit-password')
  const token = Buffer.from(`${tenant}\\${username}:${password}`).toString(
    'base64'
  )
  return `Basic ${token}`
}

export interface SoftwareModuleSelf {
  href: string
}

export interface SoftwareModuleLinks {
  self: SoftwareModuleSelf
}

export interface SoftwareModule {
  createdBy: string
  createdAt: number
  lastModifiedBy: string
  lastModifiedAt: number
  name: string
  description?: string
  version: string
  type: string
  vendor?: string
  deleted: boolean
  _links: SoftwareModuleLinks
  id: number
}

export interface Module {
  id: number
}

export interface DistributionSetRequest {
  requiredMigrationStep: boolean
  name: string
  description?: string
  type: string
  version: string
  modules: Module[]
}

export interface DistributionSetSelf {
  href: string
}

export interface DistributionSetLinks {
  self: DistributionSetSelf
}

export interface DistributionSet {
  createdBy: string
  createdAt: number
  lastModifiedBy: string
  lastModifiedAt: number
  name: string
  description: string
  version: string
  modules: SoftwareModule[]
  requiredMigrationStep: boolean
  type: string
  complete: boolean
  deleted: boolean
  _links: DistributionSetLinks
  id: number
}

export async function createDistributionSet(
  distributionSet: DistributionSetRequest
): Promise<DistributionSet[] | null> {
  const hawkbitHostUrl = core.getInput('hawkbit-host-url')

  const url = `${hawkbitHostUrl}/rest/v1/distributionsets`

  core.info(`Creating Distribution Set with name ${distributionSet.name}`)
  try {
    const response = await Axios.post(url, [distributionSet], {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getBasicAuthHeader()
      }
    })
    return response.data
  } catch (error) {
    core.error(`Failed creating distribution set ${error}`)
    return null
  }
}
