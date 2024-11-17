import axios from "axios"

/**
 * @class HttpClient
 * @description
 * Clase que implementa un cliente HTTP basado en Axios utilizando el patrón Singleton.
 * Garantiza que solo exista una única instancia de la clase en toda la aplicación,
 * asegurando consistencia en la configuración de las solicitudes y evitando
 * múltiples inicializaciones.
 */
class HttpClient {
  /**
   * @static
   * @type {HttpClient}
   * Instancia única del Singleton.
   */
  static instance

  /**
   * @constructor
   * @description
   * Configura un cliente Axios con interceptores para gestionar tokens dinámicos
   * y manejar errores. Si una instancia ya existe, devuelve la instancia previa.
   */
  constructor() {
    if (HttpClient.instance) {
      // Devuelve la instancia existente si ya fue creada
      return HttpClient.instance
    }

    // Configuración predeterminada del cliente Axios
    this.httpClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 10000, // Tiempo de espera de 10 segundos
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Interceptor para agregar dinámicamente el token a las cabeceras de la solicitud
    this.httpClient.interceptors.request.use(
      (config) => {
        config.headers["X-RapidAPI-Key"] = process.env.NEXT_PUBLIC_API_TOKEN
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Interceptor para manejar errores de respuesta
    this.httpClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          console.error("Response error:", error.response.status)
          console.error("Response error:", error.response.data)
        } else if (error.request) {
          console.error("Request error:", error.request)
        } else {
          console.error("Error:", error.message)
        }
        return Promise.reject(error)
      }
    )

    // Asignar la instancia creada a la propiedad estática
    HttpClient.instance = this
  }

  /**
   * @method mergeConfig
   * @description Fusiona configuraciones personalizadas con las configuraciones predeterminadas.
   * @param {Object} config - Configuración adicional para la solicitud HTTP.
   * @returns {Object} Configuración fusionada.
   */
  mergeConfig(config) {
    return {
      ...config,
      headers: {
        ...config?.headers,
      },
      params: config?.params,
    }
  }

  /**
   * @method get
   * @description Realiza una solicitud HTTP GET.
   * @param {string} url - URL de la solicitud.
   * @param {Object} config - Configuración adicional para la solicitud.
   * @returns {Promise<Object>} Respuesta de la API.
   */
  async get(url, config) {
    const response = await this.httpClient.get(url, this.mergeConfig(config))
    return response.data
  }

  /**
   * @method post
   * @description Realiza una solicitud HTTP POST.
   * @param {string} url - URL de la solicitud.
   * @param {Object} data - Datos a enviar en el cuerpo de la solicitud.
   * @param {Object} config - Configuración adicional para la solicitud.
   * @returns {Promise<Object>} Respuesta de la API.
   */
  async post(url, data, config) {
    const response = await this.httpClient.post(
      url,
      data,
      this.mergeConfig(config)
    )
    return response.data
  }

  /**
   * @method put
   * @description Realiza una solicitud HTTP PUT.
   * @param {string} url - URL de la solicitud.
   * @param {Object} data - Datos a enviar en el cuerpo de la solicitud.
   * @param {Object} config - Configuración adicional para la solicitud.
   * @returns {Promise<Object>} Respuesta de la API.
   */
  async put(url, data, config) {
    const response = await this.httpClient.put(
      url,
      data,
      this.mergeConfig(config)
    )
    return response.data
  }

  /**
   * @method delete
   * @description Realiza una solicitud HTTP DELETE.
   * @param {string} url - URL de la solicitud.
   * @param {Object} data - Datos a enviar en la solicitud.
   * @param {Object} config - Configuración adicional para la solicitud.
   * @returns {Promise<Object>} Respuesta de la API.
   */
  async delete(url, data, config) {
    const response = await this.httpClient.delete(url, {
      ...this.mergeConfig(config),
      data,
    })
    return response.data
  }

  /**
   * @static
   * @method getInstance
   * @description Devuelve la instancia única del cliente HTTP.
   * Si no existe, crea una nueva instancia.
   * @returns {HttpClient} Instancia única del cliente HTTP.
   */
  static getInstance() {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient()
    }
    return HttpClient.instance
  }
}

export default HttpClient
